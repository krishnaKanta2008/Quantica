import {
    // Bird,
    CircleUser,
    Home,
    LineChart,
    Menu,
    // Rabbit,
    // Settings,
    // Turtle
} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { logout } from "@/lib/githubOAuth"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/Theme/mode-toggle"
// import {
//     Card,
//     CardContent,
//     CardHeader,
//     CardTitle,
// } from "@/components/ui/card"
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select"
// import { Label } from "@/components/ui/label"
// import { Input } from "@/components/ui/input"

const MobileSidebar = () => {
  return (
      < header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6" >
          <Sheet>
              <SheetTrigger asChild>
                  <Button
                      variant="outline"
                      size="icon"
                      className="shrink-0 md:hidden"
                  >
                      <Menu className="h-5 w-5" />
                      <span className="sr-only">Toggle navigation menu</span>
                  </Button>
              </SheetTrigger>
              <SheetContent side="left" className="flex flex-col">
                  <nav className="grid gap-2 text-lg font-medium">
                      <a
                          href="#"
                          className="flex items-center gap-2 text-lg font-semibold"
                      >
                          <span className="">Quantica</span>
                      </a>
                      <a
                          href="/home"
                          className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                      >
                          <Home className="h-5 w-5" />
                          Home
                      </a>
                      <a
                          href="/plot"
                          className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                      >
                          <LineChart className="h-5 w-5" />
                          f(x) Plotter
                      </a>

                  </nav>
              </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
              {/* <form>
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search chats..."
                                    className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                                />
                            </div>
                        </form> */}
          </div>
          {/* <Sheet>
              <SheetTrigger asChild>
                  <Button
                      variant="outline"
                      size="icon"
                      className="shrink-0 md:hidden"
                  >
                      <Settings className="h-5 w-5" />
                      <span className="sr-only">Open settings</span>
                  </Button>
              </SheetTrigger>
              <SheetContent>
                  <Card>
                      <CardHeader>
                          <CardTitle>Configuration</CardTitle>
                      </CardHeader>
                      <CardContent className="grid gap-4">
                          <div className="grid gap-2">
                              <Label htmlFor="model">Model</Label>
                              <Select defaultValue="genesis">
                                  <SelectTrigger id="model">
                                      <SelectValue placeholder="Select a model" />
                                  </SelectTrigger>
                                  <SelectContent>
                                      <SelectItem value="genesis">
                                          <div className="flex items-center gap-2">
                                              <Rabbit className="h-4 w-4" />
                                              <span>Neural Genesis</span>
                                          </div>
                                      </SelectItem>
                                      <SelectItem value="explorer">
                                          <div className="flex items-center gap-2">
                                              <Bird className="h-4 w-4" />
                                              <span>Neural Explorer</span>
                                          </div>
                                      </SelectItem>
                                      <SelectItem value="quantum">
                                          <div className="flex items-center gap-2">
                                              <Turtle className="h-4 w-4" />
                                              <span>Neural Quantum</span>
                                          </div>
                                      </SelectItem>
                                  </SelectContent>
                              </Select>
                          </div>
                          <div className="grid gap-2">
                              <Label htmlFor="temperature">Temperature</Label>
                              <Input
                                  id="temperature"
                                  placeholder="Enter temperature"
                                  type="number"
                              />
                          </div>
                          <div className="grid gap-2">
                              <Label htmlFor="max-tokens">Max Tokens</Label>
                              <Input
                                  id="max-tokens"
                                  placeholder="Enter max tokens"
                                  type="number"
                              />
                          </div>
                      </CardContent>
                  </Card>
              </SheetContent>
          </Sheet> */}
          <DropdownMenu>
            <ModeToggle />
              <DropdownMenuTrigger asChild>
                  <Button variant="secondary" size="icon" className="rounded-full">
                      <CircleUser className="h-5 w-5" />
                      <span className="sr-only">Toggle user menu</span>
                  </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Support</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
          </DropdownMenu>
      </header >  
  )
}

export default MobileSidebar

    