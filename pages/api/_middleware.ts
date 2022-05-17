import { NextRequest, NextResponse } from 'next/server';
import { ipRateLimit } from '@commonLibDependent/ip-rate-limit';

export async function middleware(req: NextRequest) {
	if (
		// process.env.NODE_ENV === 'production' &&
		req.nextUrl.pathname.startsWith('/api')
	) {
		const res = await ipRateLimit(req);
		if (res.status !== 200) return res;

		res.headers.set('content-type', 'application/json');

		return NextResponse.next();

		// return new Response(JSON.stringify({ done: true }), {
		// 	status: 200,
		// 	headers: res.headers,
		// });
	}
}
