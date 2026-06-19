import dns from 'node:dns';
import mongoose from 'mongoose';

// Some networks/ISPs block or refuse SRV DNS lookups used by mongodb+srv://
dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
dns.setDefaultResultOrder('ipv4first');

const connectOptions = {
  serverSelectionTimeoutMS: 15000,
  family: 4,
};

function getUri() {
  return process.env.MONGODB_URI_DIRECT || process.env.MONGODB_URI;
}

export function printMongoHelp(error) {
  if (!String(error?.message).includes('querySrv')) return;

  console.error('');
  console.error('Atlas SRV DNS lookup failed. Fix options:');
  console.error('  1. In Atlas → Connect → Drivers → copy the "Standard connection string"');
  console.error('     Paste it as MONGODB_URI_DIRECT in server/.env (keep /restaurant_db in the URL)');
  console.error('  2. Windows: set DNS to 8.8.8.8, then run: ipconfig /flushdns');
  console.error('  3. Turn off VPN or try a mobile hotspot');
  console.error('  4. Atlas → Network Access → Allow Access from Anywhere (0.0.0.0/0)');
  console.error('');
}

export async function connectDb() {
  const primary = process.env.MONGODB_URI;
  const fallback = process.env.MONGODB_URI_DIRECT;

  if (!primary && !fallback) {
    throw new Error('MONGODB_URI is not set in server/.env');
  }

  if (fallback) {
    await mongoose.connect(fallback, connectOptions);
    return;
  }

  try {
    await mongoose.connect(primary, connectOptions);
  } catch (error) {
    if (primary.startsWith('mongodb+srv://') && !fallback) {
      printMongoHelp(error);
    }
    throw error;
  }
}
