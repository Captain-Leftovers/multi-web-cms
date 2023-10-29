import Container from '@/components/ui/container'
import MotorcycleForm from './components/motorcycle-form'

export default function NewMotorcyclesPage() {
	return (
		<main className="h-full w-full">
			<Container>
				<MotorcycleForm initialData={null} />
			</Container>
		</main>
	)
}
