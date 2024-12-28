import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const version = searchParams.get('version') || 'latest';
  const path = searchParams.get('path');

  if (!path) {
    return Response.json({ success: false, message: '경로(path)를 확인해 주세요.' });
  }

  try {
    const execSync = require('child_process').execSync;
    const output = execSync(`npx eslint@${version} --print-config ${path}`, { encoding: 'utf-8' });
    return Response.json({ success: true, output: JSON.parse(output) });
  } catch (error) {
    return Response.json({ success: false, output: error });
  }
}