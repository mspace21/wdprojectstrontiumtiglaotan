import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'name.json');
    const fileContents = await readFile(filePath, 'utf-8');
    const data = JSON.parse(fileContents);

    return NextResponse.json({ name: data.name });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Error reading name.', error }, { status: 500 });
  }
}
