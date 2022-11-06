#Blogging_API

#Table 

-DESCRIPTION
-INSTRUCTION
-REQUIREMENT
-PROJECT TREE

#DESCRIPTION
--Blogging API is an open source backend API which function is to enable registered user to create, edit published article and also delete. The article has two states "draft and published', the draft is the default state and article can also be changed to published state.Published Articles can be read 
by registered and non-registered user


#INSTRUCTION
-NODEJS that includes npm
- Install NodeJS, mongodb
- pull this repo
- update env with example.env
- run `npm run start:dev`


## Requirements
1. User should be able to register 
2. User should be able to login with Passport using JWT
3. Implement basic auth
4. User should be able to create blog
5. Users should be able to change blog state from draft to published
6. Users should be able to update and delete blogs
7. Test application
---


---
## Base URL
- /home


## Models
-User 
-Blog

### User
| field  |  data_type | constraints  |
|---|---|---|
|  id |  string |  required |
|  username |  string |  required |
|  firstname | string  |  optional|
|  lastname  |  string |  optional  |
|  email     | string  |  optional |
|  password |   string |  required  |



### blog
| field  |  data_type | constraints  |
|---|---|---|
|  id |  string |  required |
|  created_at |  date |  required |
|  state | draft/published |  required,default:1|
|  author  |  string|  required  |
|  body  | string |  required |
|  tag |   string |  required  |
|  read_count |  number |  required |




## APIs
---

### Signup User

- Route: /signup
- Method: POST
- Body: 
```
{
  "email": "doe@example.com",
  "password": "Password1",
  "firstname": "jon",
  "lastname": "doe",
  
}
```

- Responses

Success
```
{
    message: 'Signup successful',
    user: {
        "email": "doe@example.com",
        "password": "Password1",
        "firstname": "jon",
        "lastname": "doe",
        "username": 'jon_doe",
    }
}
```
---
### Login User

- Route: /login
- Method: POST
- Body: 
```
{
  "password": "Password1",
  "email": 'adeola@gmail.com",
}
```

- Responses

Success
```
{
    message: 'Login successful',
    token: 'sjlkafjkldsfjsd'
}
```
## HOME 
- Route: /home
- Method: GET
- Use:to get published blogs of by all users
- Header
    - Authorization: Bearer {token}
- Body:
Success
```
{
    "_id":""12345678987654
    "title":'politics',
    "description":"buhari era",
    "tag":"politics",
    "body":"qwertyuisdfh",
    "author":"adeola adenekan",
    "state":'draft'
    
}
---
- Route: /home/:blogid
- Method: GET
- Use:to get published blogs of by all users
- Header
    - Authorization: Bearer {token}
- Body:
Success
```
{
    "_id":""12345678987654
    "title":'politics',
    "description":"buhari era",
    "tag":"politics",
    "body":"qwertyuisdfh",
    "author":"adeola adenekan",
    "state":'draft'
    
}





---
### blog 


- Route: /blog
- Method: GET
- Use:to get blog(draft and published) of a user
- Header
    - Authorization: Bearer {token}
 -Query params:
    for only draft: state=draft
    for only published: state=published
- Body:
Success
```
{
    "_id":""12345678987654
    "title":'politics',
    "description":"buhari era",
    "tag":"politics",
    "body":"qwertyuisdfh",
    "author":"adeola adenekan",
    "state":'draft'
    
}



- Route: /blog
- Method: POST
-Use: post a new blog 
- Header
    - Authorization: Bearer {token}
- Body: 
```
{
    "title":'politics',
    "description":"buhari era",
    "tag":"politics",
    "body":"qwertyuisdfh",
    "author":"adeola adenekan",
    
    
}
```

- Responses

Success
```
{
    "_id":""12345678987654
    "title":'politics',
    "description":"buhari era",
    "tag":"politics",
    "body":"qwertyuisdfh",
    "author":"adeola adenekan",
    "state":"draft"
    
}
```
---
### Get blog

- Route: /blog/:blogid
- Method: GET
-use: views a blog (draft and published)
- Header
    - Authorization: Bearer {token}
- Responses

Success
```
{
    "title":'politics',
    "description":"buhari era",
    "tag":"politics",
    "body":"qwertyuisdfh",
    "author":"adeola adenekan",
    "state":'draft/published'
}
```


- Route: /blog/:blogid
- Method: PUT
-Use: edit a blog 
- Header
    - Authorization: Bearer {token}
- Body: 
```
{
    "title":'politics',
    "description":"buhari era",
    "tag":"politics",
    "body":"qwertyuisdfh",
    "author":"adeola adenekan",
    
    
}
```

- Responses

Success
```
{
    "_id":""12345678987654
    "title":'politics',
    "description":"buhari era",
    "tag":"politics",
    "body":"qwertyuisdfh",
    "author":"adeola adenekan",
    "state":"draft"
    
}


---


- Route: /blog/blogid
- Method: DELELTE
-use:to edit a blog
- Header:
    - Authorization: Bearer {token}

--
- Responses

Success{
    "message":"deleted"

}

...

- Route: /blog/:blogid
- Method: POST
-use: to change state from draft to published
- Header
    - Authorization: Bearer {token}
- Responses

Success
```
{
    "title":'politics',
    "description":"buhari era",
    "tag":"politics",
    "body":"qwertyuisdfh",
    "author":"adeola adenekan",
    "state":'published'
}
```



## Contributor
- ADENEKAN ADEOLA
