IMAGE_NAME=api-db

DB_PORT="${PROXY_PORT:-55432}"
SCRIPT_PATH=$(dirname $(realpath -s $0))

case "$1" in
        build)
                docker build $SCRIPT_PATH/database/. -f $SCRIPT_PATH/database/Dockerfile -t $IMAGE_NAME
                ;;
        start)
                docker run -e POSTGRES_HOST_AUTH_METHOD=trust -d -p $DB_PORT:5432 --name "$IMAGE_NAME" $IMAGE_NAME
                sleep 3
                docker start $IMAGE_NAME
                ;;
        stop)
                docker kill "$IMAGE_NAME" || true
                docker rm "$IMAGE_NAME" || true
                ;;
        status)
                docker ps -f name=$IMAGE_NAME
                ;;
        *) echo "'$1' is invalid option; available commands: 'build', 'start', 'stop', 'status'" ;;
esac
