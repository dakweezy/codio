class sessions {
  
  constructor()
  {
     this._sessions = {};
  }

  create(data) 
  {
    var id = uuid(); // INSTALL UUID IN TERM
    while (this._sessions[id])
      {
        id = uuid(); 
      }
    this._sessions[id] = {data};
    return id;
  }
  
  update(id, data)
  {
    this._session[id] = data;
  }
  
  destroy(id)
  {
    delete this._session[id]; // RIP sweet prince
  }
  
  read(id)
  {
    return this._session[id];
  }
}