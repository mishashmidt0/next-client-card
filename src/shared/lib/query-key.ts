type QueryKey = 'allMessage' | 'pack'

export function queryKey(key:QueryKey, args?: string[]) {
    return args ? [key, ...args] : [key]
}