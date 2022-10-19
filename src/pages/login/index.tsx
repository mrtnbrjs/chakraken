import {
	Flex,
	Stack,
	Heading,
	Box,
	Button,
	FormControl,
	Input,
	InputGroup,
	InputLeftElement,
	InputRightElement,
	CircularProgress,
} from "@chakra-ui/react"
import { FiLock, FiUser, FiArrowRight, FiEye, FiEyeOff } from "react-icons/fi"
import { useRouter } from "next/router"
import ApiService from "../../../data/services/ApiService"

import { useState, useEffect } from "react"
import Head from "next/head"
import { userLogin } from "../../fixtures/login"
import KAlert from "../../components/alert/KAlert"
import { getSession, signIn } from "next-auth/react"
import { useSession } from "next-auth/react"

const Index = () => {
	const router = useRouter()
	const [showPassword, setShowPassword] = useState(false)
	const handleShowClick = () => setShowPassword(!showPassword)
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [error, setError] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const { data: session, status } = useSession()
	const [loadedSession, setLoadedSession] = useState({})

	const handleLogout = async (event) => {
		event.preventDefault()
		localStorage.clear()
		window.location.reload()
	}

	const handleSubmit = async (event) => {
		event.preventDefault()
		setError(false)
		setIsLoading(true)

		const result = await signIn("credentials", {
			redirect: false,
			username: username,
			password: password,
		})

		if (result.ok) {
			const session = await getSession()
			//localStorage.setItem("session", result.data.data)
			//localStorage.setItem("_user", JSON.stringify(result.data.user))
			router.push("/dashboard")
		} else {
			setError(true)
		}
	}

	return (
		<Flex
			className="gradient-login"
			flexDirection="column"
			width="100wh"
			height="100vh"
			justifyContent="center"
			alignItems="center"
			backgroundColor="#020202"
			color="#fff"
		>
			<Head>
				<title>Kraken | Login</title>
			</Head>
			<Stack
				flexDir="column"
				mb="1"
				justifyContent="center"
				alignItems="center"
			>
				<Heading
					m={25}
					fontSize={["4xl"]}
					alignSelf="center"
					letterSpacing="tight"
				>
					Kraken
				</Heading>
				<Box minW={{ base: "100%", md: "468px" }}>
					<form onSubmit={handleSubmit}>
						<Stack
							spacing={4}
							p="2rem"
							bgColor="#fff"
							boxShadow="md"
							borderRadius={15}
						>
							<FormControl isRequired>
								<InputGroup>
									<InputLeftElement pointerEvents="none" color="#333">
										<FiUser color="#333" />
									</InputLeftElement>
									<Input
										color="#333"
										type="text"
										placeholder="Usuario"
										onChange={(event) => setUsername(event.currentTarget.value)}
									/>
								</InputGroup>
							</FormControl>
							<FormControl isRequired mt={6}>
								<InputGroup>
									<InputLeftElement pointerEvents="none" color="#333">
										<FiLock color="#333" />
									</InputLeftElement>
									<Input
										color="#333"
										type={showPassword ? "text" : "password"}
										placeholder="*******"
										onChange={(event) => setPassword(event.currentTarget.value)}
									/>
									<InputRightElement width="4.5rem">
										<Button
											h="1.75rem"
											size="sm"
											onClick={handleShowClick}
											color="#555050"
										>
											{showPassword ? <FiEyeOff /> : <FiEye />}
										</Button>
									</InputRightElement>
								</InputGroup>
							</FormControl>
							<Button
								mt={4}
								bgColor="blackAlpha.900"
								color="#fff"
								p={7}
								borderRadius={15}
								type="submit"
								variant="solid"
								rightIcon={
									!isLoading ? (
										<FiArrowRight />
									) : (
										<CircularProgress
											isIndeterminate
											color="white"
											size={"20px"}
										/>
									)
								}
								_hover={{ bg: "#4d4d4d" }}
							>
								Login
							</Button>
							{/* <Button onClick={handleLogout}>logout</Button> */}
							<Box mt={10} maxW="404px">
								{error && (
									<KAlert
										icon
										status={"error"}
										title="Verifique su nombre de usuario y contraseña y vuelva a intentarlo."
									/>
								)}
							</Box>
						</Stack>
					</form>
				</Box>
			</Stack>
		</Flex>
	)
}

export async function getServerSideProps(context) {
	const session = await getSession({ req: context.req })

	if (session) {
		return {
			props: { session },
			redirect: {
				destination: "/dashboard",
				permanent: false,
			},
		}
	} else {
		return {
			props: {},
		}
	}
}

export default Index
