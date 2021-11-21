# DevHelper
ToolBlocks

# New
### getTool --------------------------------------------------
Deprecates selectTool. 
Gets a tool from store using a specific ID.

```JS
getTool({id: toolId, store: storeData, props: ["title"] })
```

__id__ : string
URL ID of the tool

__store__ : STORE
ReduxStore

__props__ : string[]
Array containing the keys expected in the retrieved object.
If this is omitted the entire object is retrieved.

### getTools --------------------------------------------------
Same as getTool but ID is an array

__id__ : string[]
Array of URL ID of the tool

__store__ : STORE
ReduxStore

__props__ : string[]
Array containing the keys expected in the retrieved object.
If this is omitted the entire object is retrieved.

### getToolsByProp ------------------------------------------
Gets all the tools where a evaluation of a property is true.
In the exemple we get all the tools that are in the storage x-100

```JS
getToolsByProp({
    store: storeData,
    propertie: 'storage',
    evaluator: (e: any) => {
      return e === "x-100"
    },
  })
```
__store__ : STORE
ReduxStore

__propertie__ : string
Name of the key on the object where the evaluation will be carried out.

__evaluator__ : function
A function that will be executed on the selected propertie.

# OLD

### selectTool

```JS

selectTool(toolId, storeData)

```