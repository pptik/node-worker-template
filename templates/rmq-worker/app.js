async function main () {
    let conn = await require('./setup').connectToRmq()
    require('./services/consumer').consume(conn)
  }
  
  main()