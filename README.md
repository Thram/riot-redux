# riot-redux

[![Greenkeeper badge](https://badges.greenkeeper.io/Thram/riot-redux.svg)](https://greenkeeper.io/)

Redux implementation for RiotJS as a Mixin

Riot bindings for Redux. 

## Implementation

```html
/* child-tag.tag */
<child-tag>
  <div>
    hello {state.name}
  </div>
  <input type="text" onkeyup="{actions.changeName}" /> 
  <script>
    var riotRedux = require('riot-redux')
    this.mixin(riotRedux)
  </script>
</child-tag>
```

## Simple Use

```html
/* parent-tag.tag */
<parent-tag>
  <child-tag state="{child_init_state}" actions="{child_actions}"></child-tag>

  <script>
    var tag = this;
    tag.child_init_state = { name: "Thram" };
    tag.child_actions = { 
        changeName: function(ev) {
            return {name: ev.target.value};
        }
     };
  </script>
</parent-tag>
```

## Custom Reducer

```html
/* parent-tag.tag */
<parent-tag>
  <child-tag state="{child_init_state}" actions="{child_actions}" reducers="{child_reducer}"></child-tag>

  <script>
    var tag = this,
        nextState = require('riot-redux/maps').nextState;
    tag.child_init_state = { name: "Thram" };
    tag.child_actions = { 
        changeName: function(ev) {
            return {name: ev.target.value};
        }
     };
    tag.child_reducer = function (state, action) {
            // Custom handle your actions
            var nState          = nextState(state, action);
            if(action.type === "changeName"){
                nState.name = nState.name + " is Awesome!"
            }
            return nState;
     };
  </script>
</parent-tag>
```