# ToolWarehouse

Dev Logic [link](devLogic.md)
Change Log [link](changeLog.md)

# ID Structure

| Category      | ID     | regex |
| ------------- | ------ | ----- |
| Tool          | A00    |       |
| Tool          | B00    |       |
| Bike          | BK00   |       |
| Consumable    | CX0000 |       |
| Lock Key      | L00    |       |
| Storage - Fix | X00    |       |
| Storage - Mob | Z00    |       |

# Structure Of tools

```JSON
"ID":{
  "00": {
    "title": "Tool Name",
    "fullName": "Maker 2000 Model Super Deluxe",
    "storage": "X-001"
  }
}
```

# Importance Score

Measure of use base on timesd used in the last 3 years.

| frequencyOfUse | time       | Note |
| -------------- | ----       | --- |
| 75 - 100       |  Daily     | once every day for the last 3 years |
| 50 - 75        |  weekly    | once every week for the last 3 years |
| 25 - 50        |  Monthly   | once every mount for the last 3 years |
| 10 - 25        |  quarterly | once every quarter at least once | 
| 5 - 10         |  Yearly    | used every year at least once but no less then 5 uses | 
| 0 - 5          |  rare      | how many times has it been used in the last 3 years, for every use there is a point |


Measure of how many other tools can be used as a substitute. 

| importance     | sim. tools   | Note |
| -------------- | ----         | --- |
| 75 - 100       |  <=1         | There is no duplicate tools, just one that is a similar  |
| 50 - 75        |  <2          | There is at least a tool that can do the job of this tool  |
| 0 - 50         |  <5           | There are multiple tools that do the same thing |

Measure of how many other tools are there on the market that you would want to replace this tool with.

| indispensability  | Note |
| --------------    | ---- |
| 75 - 100          | Never think of replacing this tool, its all the tool you need  |
| 50 - 75           | There is on tool you want but is to expensive or can`t justify the cost of the new one   |
| 25 - 50           | Actively looking the the new tool or putting money aside for the new tool  |
| 0 - 25            | Need a new tool, will buy a new tool  |


#start proceducere

```
clone
npm install
yarn start
```
