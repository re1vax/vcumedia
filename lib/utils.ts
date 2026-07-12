/** shadcn-style class combiner (dependency-free variant). */
export function cn(...inputs: Array<string | undefined | null | false>) {
  return inputs.filter(Boolean).join(" ");
}
