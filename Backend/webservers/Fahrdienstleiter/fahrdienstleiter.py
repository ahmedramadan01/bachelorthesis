from flask import Flask, request, render_template
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__, template_folder='template')
CORS(app)

messages = []
sendingStamps = []
receivedStamps = []


@app.route('/', methods=['GET', 'POST'])
def receive_message():
    if request.method == 'POST':
        data = request.get_json()
        dt = datetime.now()        
        print(data)
        dtStr = str(dt)
        print("dt is string", dtStr)

        receivedStamps.append(dtStr)
        message = data.get('message', '')

        sendingStamp = data.get('timeStamp', '')
        sendingStampArr = sendingStamp.split("T")
        timeSent = sendingStampArr[1].split("Z")[0]

        sendingStamps.append(sendingStampArr[0] + " " + timeSent)

        print(message)
        messages.append(message)
        print("messages are", messages)

    return render_template('index.html', len=len(messages), messages=messages,
                           sendingStamps=sendingStamps,
                           receivedStamps=receivedStamps)


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=5000)
