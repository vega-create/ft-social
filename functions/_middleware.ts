/**
 * 2026-10-26 本站停止經營：整站 301 到 chparenting.com 家族對應頁（舊網域保留一年）。
 * 家庭類計算機已搬到 pregnancy／baby 的 tools 區；其餘工具導到 baby 的全部工具頁。
 */
const MAP: Record<string, string> = {};
const FALLBACK = "https://baby.chparenting.com/tools/all/";

export const onRequest = async (context: { request: Request }): Promise<Response> => {
  const url = new URL(context.request.url);
  const seg = url.pathname.replace(/^\/+|\/+$/g, '').split('/')[0] || '';
  const target = MAP[seg] ?? FALLBACK;
  return Response.redirect(target, 301);
};
