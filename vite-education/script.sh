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
        echo -ne "$(printcolor $RED 'Clone folder found' )"
        progressbar 'printcolor' "$RED" 'Deleting' & pid="$!"
        then rm -Rf ${FILEPATH}; 
        kill -s USR1 "$pid"
        echo -ne "\n"
    fi
}

cloneRepo() {
    echo -e "\n"
    checkFolder
    echo -ne "$(printcolor $YELLOW "Conning in ${FILEPATH}" )"
    echo -e "\n"
    progressbar 'printcolor' "$CYAN" 'Clonning' & pid="$!"
    cloneCmd="git clone git@github.com:gh-cli-for-education/gh-education.git ${FILEPATH}"
    cloneCmdRun=$($cloneCmd 2>&1)
    kill -s USR1 "$pid"
    echo -ne "\n $(printcolor $GREEN 'Clone completed succesfullly' ) \n"
}

createTeams() {
    progressbar 'printcolor' "$CYAN" 'Creating Organization & Teams' & pid="$!"
    kill -s USR1 "$pid"
}

basicConfig() {
    arr=("")
    opt=""

    echo -ne "$(printcolor $CYAN '1)' ) Nombre Asignatura\n"
    echo -ne "   "
    read -r opt
    arr+=(${opt})

    opt=""
    echo -ne "$(printcolor $CYAN '2)' ) Curso\n"
    echo -ne "   "
    read -r opt
    arr+=(${opt})

    echo -ne "\ec"
    echo -ne "
        $(printcolor $YELLOW '# INFOROMACIÓN CONFIGURACIÓN #' )
        $(printcolor $CYAN 'Nombre asignatura: ' ) ${arr[1]} 
        $(printcolor $CYAN 'Curso: ' ) ${arr[2]} 
    "
}

menuOptions() {
    ans=1
    while [ $ans -ne 0 ]
    do
        echo -ne "
        $(printcolor $YELLOW '# CONFIGURACIÓN ASIGNATURA #' )
        $(printcolor $CYAN '1)' ) Configuración básica
        $(printcolor $MAGENTA '2)' ) Crear Teams & Organización
        $(printcolor $RED '0)' ) Exit
        Choose an option:  "
            read -r ans
            case $ans in
            1)
                echo -en "\ec"
                basicConfig
                ;;
            2)
                echo -en "\ec"
                createTeams
                ;;
            3)
                echo -ne "\ec"
                ;;
            0)
                echo -ne "$(printcolor $RED 'exiting...' )"
                echo -ne "\n"
                exit 0
                ;;
            *)
                cho -ne "$(printcolor $RED '0)' ) BAD OPTION"
                ;;
            esac
    done
}

initialmenu() {
    ans=1
    while [ $ans -ne 0 ]
    do
        echo -ne "
        $(printcolor $YELLOW '# OPCIONES DISPONIBLES #' )
        $(printcolor $CYAN '1)' ) Crear Template
        $(printcolor $MAGENTA '2)' ) Actualizar Teams
        $(printcolor $RED '0)' ) Exit
        Choose an option:  "
            read -r ans
            case $ans in
            1)
                echo -en "\ec"
                cloneRepo
                menuOptions
                ;;
            2)
                echo -en "\ec"
                createTeams
                ;;
            3)
                echo -ne "\ec"
                ;;
            0)
                echo -ne "$(printcolor $RED 'exiting...' )"
                echo -ne "\n"
                exit 0
                ;;
            *)
                cho -ne "$(printcolor $RED '0)' ) BAD OPTION"
                ;;
            esac
    done
}

echo -en "\ec"
initialmenu