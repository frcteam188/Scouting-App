import requests
import json

eventKey = "2020onosh"
TBA_API_KEY = "YAD64DUsiMVI2ozfw2vmn1LdkYIoaUkAxLbPKEeHtnC6WPJcWZMtXelqScWY4Z0Q"
url = (f"https://www.thebluealliance.com/api/v3/event/{eventKey}/matches/simple")
headers = {'X-TBA-Auth-Key': TBA_API_KEY}
# Fetch match(s) from TBA API
data = requests.get(url, headers=headers).text

jsonData = json.loads(data)

newSchedule = []
newDict = {}

for i in jsonData:
    if (i["match_number"]) and (i["comp_level"] == "qm"):
        newDict = {
            "matchNumber": i["match_number"],
            "eventID": i["event_key"],
            "eventName": "2019 Durham",
            "r1": i["alliances"]["red"]["team_keys"][0],
            "r2": i["alliances"]["red"]["team_keys"][1],
            "r3": i["alliances"]["red"]["team_keys"][2],
            "b1": i["alliances"]["blue"]["team_keys"][0],
            "b2": i["alliances"]["blue"]["team_keys"][1],
            "b3": i["alliances"]["blue"]["team_keys"][2]
        }
        req = requests.post("http://localhost:3000/v1/schedule/insert-match", data=newDict)
        print(req.status_code, req.reason)