import { resolve } from "node:path"
import { checkArchBootloader, OUTPUT_FOLDER, c_compiler, checkOutputFolder, SOURCES_FOLDER, cxx_flags, kernelObject, bootObject, outputObject, BOOTLOADER_FOLDER, linker_flags, linker_libraries, execute } from "./common.mjs"

const arch = process.argv[2]
const bootloader = process.argv[3]
checkArchBootloader(arch,bootloader)

const linkerFile = resolve(BOOTLOADER_FOLDER,arch,`${bootloader}.ld`)

execute(`${c_compiler(arch)} -T ${linkerFile} -o ${outputObject} ${linker_flags} ${bootObject} ${kernelObject} ${linker_libraries}`)