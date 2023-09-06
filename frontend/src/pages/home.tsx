import { CenterPage } from "../components/body/centerPage";
//import InterativeList from "../components/list/list";
import { Navbar } from "../components/navbar/navbar";
import { TableMaterial } from "../components/table/table";

export function Home() {
  return (
    <>
      <Navbar />
      <CenterPage>
        {/*<InterativeList />*/}
        <TableMaterial/>
      </CenterPage>
    </>
  );
}
