import { Navbar } from "../components/navbar/navbar";
import { CenterPage } from "../components/body/centerPage";
import { Forms } from "../components/form/forms";

export function FormMaterial() {
  return (
    <>
      <Navbar />
      <CenterPage>
          <h1> Formulário </h1>

        <Forms />
      </CenterPage>
    </>
  );
}
