export const stringify = (params: Record<any, any>): string => {
  return Object.entries(params)
    .filter(
      ([_, value]) => value !== null && value !== "" && value !== undefined
    ) // 过滤掉 null, '', undefined
    .map(([key, value]) => `${key}=${value}`) // 拼接成 key=value
    .join("&"); // 使用 & 连接
};
