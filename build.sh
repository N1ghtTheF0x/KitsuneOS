#!/bin/bash
node $(dirname "$0")/scripts/compile-bootloader.mjs $1 $2
node $(dirname "$0")/scripts/compile-kernel.mjs $1 $2
node $(dirname "$0")/scripts/link.mjs $1 $2