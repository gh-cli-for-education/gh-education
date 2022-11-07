#!/bin/bash

## VARIABLES GENERALES ##
PATH=$PATH:"WebSite/app"
FILEPATH="/mnt/c/Users/Usuario/Desktop/gh-education/vite-education/clone"

### Colors ##
ESC=$(printf '\033') RESET="${ESC}[0m" BLACK="${ESC}[30m" RED="${ESC}[31m"
GREEN="${ESC}[32m" YELLOW="${ESC}[33m" BLUE="${ESC}[34m" MAGENTA="${ESC}[35m"
CYAN="${ESC}[36m" WHITE="${ESC}[37m" DEFAULT="${ESC}[39m" GRAY="${ESC}[38m"

### Color Functions ##
printcolor() { printf "$1%s${RESET}\n" "$2"; }

## Main Functions ##

progressbar () {
    trap 'break' USR1
    echo -ne ""$2" "$3""
    while echo -ne ""$2"." >&2; do
        sleep 0.25
    done
}

checkFolder() {
    if [ -d "${FILEPATH}" ]; 
        progressbar 'printcolor' "$RED" 'Deleting' & pid="$!"
        then rm -Rf ${FILEPATH}; 
        kill -s USR1 "$pid"
        echo -ne "\n"
    fi
}

cloneRepo() {
    echo -e "\n"
    checkFolder
    progressbar 'printcolor' "$CYAN" 'Clonning' & pid="$!"
    cloneCmd="git clone git@github.com:gh-cli-for-education/gh-education.git ${FILEPATH}"
    cloneCmdRun=$($cloneCmd 2>&1)
    kill -s USR1 "$pid"
    echo -ne "\n $(printcolor $GREEN 'Clone completed succesfullly' ) \n"
}

createTeams() {
    echo -e "Creating teams:"
}

initialmenu() {
    echo -ne "
    $(printcolor $YELLOW '# OPCIONES DISPONIBLES #' )
    $(printcolor $CYAN '1)' ) Clonar Repositorio
    $(printcolor $MAGENTA '2)' ) Crear Teams & Organización
    $(printcolor $BLUE '3)' ) Configuración
    $(printcolor $RED '0)' ) Exit
    Choose an option:  "
        read -r ans
        case $ans in
        1)
            cloneRepo
            ;;
        2)
            createTeams
            ;;
        3)
            ;;
        0)
            echo "Bye bye."
            exit 0
            ;;
        *)
            echo "Wrong option."
            exit 1
            ;;
        esac
}

initialmenu