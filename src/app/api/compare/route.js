// src/app/api/compare/route.js
import { listDiff } from '@/utils/listDiff';

export async function POST(req) {
  try {
    const { listA, listB } = await req.json();
    const differences = listDiff(listA, listB);
    return new Response(JSON.stringify(differences), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: 'Something went wrong' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
