const model = () => {
    let warningsData = [];

    const addWarning = warning => {
        warningsData.push(warning)
        return warning
    }

    const updateWarning = warning => warningsData[warningsData.findIndex(w => w.id == warning.id)] = warning

    const getWarning = id => warningsData[warningsData.findIndex(w => w.id == id)]

    const isChanged = newWarning => {
        let oldWarning = getWarning(newWarning.id)

        let j1 = JSON.stringify(newWarning)
        let j2 = JSON.stringify(oldWarning)
        return j1 != j2
    }

    const exists = warning => warningsData.findIndex(w => w.id == warning.id) > -1

    return {
        addWarning,
        updateWarning,
        getWarning,
        exists,
        isChanged
    }
}

export default model