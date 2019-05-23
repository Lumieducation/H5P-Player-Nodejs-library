function get_main_library(main_library, dependencies) {
    return `${main_library} ${
        dependencies.filter(dep => dep.machineName === main_library)[0]
            .majorVersion
    }.${
        dependencies.filter(dep => dep.machineName === main_library)[0]
            .minorVersion
    }`;
}

module.exports = get_main_library;
