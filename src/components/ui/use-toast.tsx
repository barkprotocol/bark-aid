import { useToast } from "@/components/ui/use-toast"

function MyComponent() {
  const { toast } = useToast()

  const handleClick = () => {
    toast({
      title: "Success",
      description: "Your action was completed successfully.",
    })
  }

  return <button onClick={handleClick}>Show Toast</button>
}