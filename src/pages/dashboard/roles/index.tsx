import { getSession } from "next-auth/react";
import KPage from "../../../components/page/KPage";
import ApiService from "../../../../data/services/ApiService";
import { useQuery } from "react-query";
import { createColumnHelper } from "@tanstack/react-table";
import { KTableLayout } from "../../../components/tableLayout/KTableLayout";
import { EditIcon, DeleteIcon, AddIcon } from "@chakra-ui/icons";
import { Box, Button, ButtonGroup, Flex } from "@chakra-ui/react";
import Link from "next/link";

export interface areasTable {
  de_rol: string;
  id_rol: string;
}

export default function Roles(): any {
  const { isLoading, data: roles } = useQuery(
    "roles",
    async () => await ApiService.getRoles()
  );

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  const columnHelper = createColumnHelper<areasTable>();

  const columns = [
    columnHelper.accessor("de_rol", {
      cell: (info) => info.getValue(),
      header: "Descripción",
    }),
    columnHelper.accessor("id_rol", {
      cell: (props) => (
        <ButtonGroup gap="2">
          <Box m={2} cursor="pointer">
            <Link
              href={{
                pathname: "/dashboard/roles/" + props.getValue(),
              }}
            >
              <EditIcon />
            </Link>
          </Box>
          <Box m={2} cursor="pointer">
            <DeleteIcon />
          </Box>
        </ButtonGroup>
      ),
      header: "Acciones",
    }),
  ];

  return (
    <KPage title="Roles">
      <Box>
        <Flex mb={4} display="grid" justifyItems="flex-end">
          <Link href={"/dashboard/roles/new"}>
            <Button
              w="200px"
              alignSelf="flex-end"
              color="#fff"
              bg="#1cb35b"
              _hover={{ bg: "#238152" }}
              leftIcon={<AddIcon />}
            >
              Nuevo rol
            </Button>
          </Link>
        </Flex>
        <KTableLayout
          columns={columns}
          data={roles.map(({ id_rol, de_rol }) => ({
            id_rol,
            de_rol,
          }))}
        />
      </Box>
    </KPage>
  );
}

export async function getServerSideProps(context: { req: any }): Promise<any> {
  const session = await getSession({ req: context.req });

  if (session == null) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return { props: { session } };
}