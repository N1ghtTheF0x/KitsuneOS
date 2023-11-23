import { readdirSync } from "node:fs"
import { resolve, extname } from "node:path"
import { checkArchBootloader, cxx_compiler, checkOutputFolder, SOURCES_FOLDER, BOOTLOADER_FOLDER, cxx_flags, kernelObject, execute, ARCH_SOURCES_FOLDER } from "./common.mjs"

const arch = process.argv[2]
const bootloader = process.argv[3]
checkArchBootloader(arch,bootloader)

const sources = []

function scanForFiles(folder)
{
    const files = readdirSync(folder,{withFileTypes: true})
    for(const file of files)
    {
        const path = resolve(file.path,file.name)
        if(file.isDirectory())
            scanForFiles(path)
        if(file.isFile() && [".cpp",".hpp"].includes(extname(path)))
            sources.push(path)
    }
}

scanForFiles(SOURCES_FOLDER)
scanForFiles(ARCH_SOURCES_FOLDER)

checkOutputFolder()
execute(`${cxx_compiler(arch)} -D${arch.toUpperCase()} -D${bootloader.toUpperCase()} -c ${sources.join(" ")} -o ${kernelObject} ${cxx_flags}`)