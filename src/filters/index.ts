import { hasVal as hasValUtil } from "@/utils/has";

// Filter to has value or null
export const hasVal = (item: any, key: string, defaultVal?: any) => {
  return hasValUtil(item, key, defaultVal);
};
