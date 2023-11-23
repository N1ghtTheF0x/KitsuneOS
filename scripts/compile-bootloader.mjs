import { resolve } from "node:path"
import { checkArchBootloader, assembler, checkOutputFolder, bootObject, execute, BOOTLOADER_FOLDER, clearOutput } from "./common.mjs"

const arch = process.argv[2]
const bootloader = process.argv[3]
checkArchBootloader(arch,bootloader)

const bootloaderFile = resolve(BOOTLOADER_FOLDER,arch,`${bootloader}.s`)

const asm = assembler(arch)

clearOutput()
checkOutputFolder()
execute(`${asm} ${bootloaderFile} -o ${bootObject}`)