if [ $# != 1 ]
then
    echo "Usage: bot.sh <start/stop>"
    exit 1
fi

if [ $1 == 'start' ]
then
    pm2 start main.js --name "BigNoseBot" --watch --ignore-watch="node_modules"
    exit 0
fi

if [ $1 == 'stop' ]
then
    pm2 stop BigNoseBot
    exit 0
fi

echo "Usage: bot.sh <start/stop>"
exit 1
