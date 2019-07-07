import * as AsciiTable from "ascii-table";
class RoutesList {

  public static table;


  public static termainal(app){
    RoutesList.table = new AsciiTable("List All Routes");
    RoutesList.table.setHeading("Method", "URI");
      app._router.stack.forEach(
      RoutesList.print.bind(undefined, [])    
    );
    console.log(RoutesList.table.toString())
  }

  public web() {

    let table = `<table>
    <thead>
    <tr>
    <th colspan="2" align="center">List All Routes</th>
    </tr>
    </thead>
    <tbody>
    `;


    table += `</tbody></table>`;
  
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
    } else if (layer.method) {
      RoutesList.table.addRow(
        layer.method.toUpperCase(),
        path
          .concat(RoutesList.split(layer.regexp))
          .filter(Boolean)
          .join("/")
      );
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
