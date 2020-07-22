import * as AsciiTable from "ascii-table";
class RoutesList {

  public static table;
  public static data=[];


  public static terminal(app){
    RoutesList.table = new AsciiTable("List All Routes");
    RoutesList.table.setHeading("Method", "URI");
      app._router.stack.forEach(
      RoutesList.print.bind(undefined, [])
    );
    RoutesList.data.forEach((item:any) => {
      RoutesList.table.addRow(item.method,item.URI);
    });
    console.log(RoutesList.table.toString())
  }

  public static web(app,path) {
    app._router.stack.forEach(
      RoutesList.print.bind(undefined, [])
    );
    let table = `<!DOCTYPE html>
    <html>
    <head>
    <style>
    body{
      width:75%;
      margin: 0 auto;
      font-family: Arial, Helvetica, sans-serif;
    }

    table, th, td {
      border: 1px solid #dee2e6;
      border-collapse: collapse;
    }
    th, td {
      padding: 15px;
      text-align: left;
    }
    table{
      width:"100%"
    }
    th{
      font-size: 18px;
      color: #fff;
      font-weight:"bold";
      line-height: 1.4;
      background-color: #343a40;
    }
    .text-center{
      text-align:center;
    }
    </style>
    </head>
    <body>
    <h1 class="text-center">List of Routes</h1>
    <table style="width:100%">
    <thead>
    <tr>
    <th class="text-center" align="center">#</th>
    <th align="center">METHOD</th>
    <th align="center">URI</th>
    </tr>
    </thead>
    <tbody>
    `;
    RoutesList.data.forEach((item:any,index:any) => {
      table+=`<tr><td class="text-center">${index+1}</td><td>${item.method}</td><td>${item.URI}</td></tr>`;
    });
    table += `</tbody></table></body></html>`;
    app.get(path,(req,res)=>{
      res.send(table);
    })
  }


  protected static print(path, layer) {
    if (layer.route) {
      layer.route.stack.forEach(
        RoutesList.print.bind(
          undefined,
          path.concat(RoutesList.split(layer.route.path))
        )
      );
    } else if (layer.name === "router" && layer.handle.stack) {
      layer.handle.stack.forEach(
        RoutesList.print.bind(
          undefined,
          path.concat(RoutesList.split(layer.regexp))
        )
      );
    }
    else if (layer.method) {
      var item = {
        method: [layer.method.toUpperCase()],
        URI: path
          .concat(RoutesList.split(layer.regexp))
          .filter(Boolean)
          .join("/")
      };
      for (let i = 0; i < RoutesList.data.length; i++)
        if (RoutesList.data[i].URI === item.URI ) {
          if (!RoutesList.data[i].method.includes(item.method[0]))
            RoutesList.data[i].method = RoutesList.data[i].method.concat(item.method)
          else
            return
        }
      RoutesList.data.push(item);
    }
  }

  protected static split(thing: any) {
    if (typeof thing === "string") {
      return thing.split("/");
    } else if (thing.fast_slash) {
      return "";
    } else {
      const match = thing
        .toString()
        .replace("\\/?", "")
        .replace("(?=\\/|$)", "$")
        .match(/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//);
      return match
        ? match[1].replace(/\\(.)/g, "$1").split("/")
        : "<complex:" + thing.toString() + ">";
    }
  }


}

export default RoutesList;
