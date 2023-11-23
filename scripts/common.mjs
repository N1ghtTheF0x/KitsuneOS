import { existsSync, mkdirSync, readdirSync, rmSync } from "node:fs"
import { dirname, resolve, basename,extname } from "node:path"
import { exec } from "node:child_process"

export const __dirname = dirname(new URL(import.meta.url).pathname)
export const CROSSC_FOLDER = resolve(process.env.HOME,"opt","cross")
export const BOOTLOADER_FOLDER = resolve(__dirname,"..","bootloader")
export const OUTPUT_FOLDER = resolve(__dirname,"..","output")
export const SOURCES_FOLDER = resolve(__dirname,"..","source")
export const ARCH_SOURCES_FOLDER = resolve(__dirname,"..","arch")

export const assembler = (arch) => resolve(CROSSC_FOLDER,"bin",`${arch}-elf-as`)
export const c_compiler = (arch) => resolve(CROSSC_FOLDER,"bin",`${arch}-elf-gcc`)
export const cxx_compiler = (arch) => resolve(CROSSC_FOLDER,"bin",`${arch}-elf-g++`)

export const cxx_flags = "-ffreestanding -O2 -Wall -Wextra -fno-exceptions -fno-rtti"
export const linker_flags = "-ffreestanding -O2 -nostdlib"
export const linker_libraries = "-lgcc"

export function checkOutputFolder()
{
    if(!existsSync(OUTPUT_FOLDER))
        mkdirSync(OUTPUT_FOLDER,{recursive: true})
}

export function clearOutput()
{
    rmSync(resolve(OUTPUT_FOLDER,"*"),{force: true,recursive: true})
}

export const bootObject = resolve(OUTPUT_FOLDER,"boot.o")
export const kernelObject = resolve(OUTPUT_FOLDER,"kernel.o")
export const outputObject = resolve(OUTPUT_FOLDER,"os.bin")

export function checkArchBootloader(arch, bootloader) 
{
    if(!arch || !bootloader) 
    {
        console.info("Usage: <arch> <bootloader>")
        process.exit(1)
    }

    const possibleArchs = new Set(readdirSync(BOOTLOADER_FOLDER))

    if(!possibleArchs.has(arch))
    {
        console.error(`${arch} is not available! Possible archs: ${possibleArchs.join(", ")}`)
        process.exit(1)
    }

    const archFolder = resolve(BOOTLOADER_FOLDER,arch)

    const possibleBootloaders = new Set(readdirSync(archFolder).map((s) => basename(s, extname(s))))

    if(!possibleBootloaders.has(bootloader))
    {
        console.error(`${bootloader} is not available! Possible bootloaders: ${possibleBootloaders.join(", ")}`)
        process.exit(1)
    }
}

export function execute(command)
{
    const child = exec(command)

    child.stdout.pipe(process.stdout)
    child.stderr.pipe(process.stderr)
    child.on("exit", (code, signal) => process.exit(code))
}

export const setExtension = (path,ext) => basename(path,extname(path)) + "." + ext