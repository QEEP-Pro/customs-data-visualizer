export default (matchMap: {[key: string]: any}, defaultValue: any = null) => {
    return (key: string) => {
        const keys = Object.keys(matchMap)

        for (let i = 0; i < keys.length; i++) {
            if (key === keys[i]) {
                return matchMap[key]
            }
        }

        return defaultValue
    }
}
