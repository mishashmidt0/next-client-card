type QueryKey = 'allMessage'

export function queryKey(key:QueryKey, args?: string[]) {
    return args ? [key, ...args] : [key]
}