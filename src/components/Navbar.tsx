// Importaciones esenciales para el componente
import { useState } from "react"; // Hook para manejar el estado del menú móvil
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu"; // Componentes de navegación de Shadcn/Radix UI
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"; // Componentes para el menú lateral móvil
import { buttonVariants } from "./ui/button"; // Estilos predefinidos para botones
import { Menu } from "lucide-react"; // Icono de menú para móviles
import { ModeToggle } from "./mode-toggle"; // Componente personalizado para cambiar tema claro/oscuro
import logoIsafe from "@/assets/logoIsafe.png"; // Imagen del logo importada desde src/assets/
import { FaWhatsapp } from "react-icons/fa"; // Icono de WhatsApp de react-icons

// Interfaz para definir la estructura de los enlaces del menú
interface RouteProps {
  href: string;
  label: string;
}

// Lista de rutas para el menú de navegación
const routeList: RouteProps[] = [
  { href: "#Inicio", label: "Inicio" },
  { href: "#Sobre Nosotros", label: "Sobre Nosotros" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

// Componente principal de la barra de navegación
export const Navbar = () => {
  // Estado para controlar si el menú móvil está abierto o cerrado
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    // Encabezado fijo con soporte para modo oscuro
    <header className="sticky border-b-[1px] top-0 z-40 w-full bg-white dark:border-b-slate-700 dark:bg-background">
      <NavigationMenu className="mx-auto">
        {/* Lista de elementos de navegación con altura fija y distribución entre extremos */}
        <NavigationMenuList className="container h-14 px-4 w-screen flex justify-between">
          {/* Logo y nombre de la app */}
          <NavigationMenuItem className="font-bold flex">
            <img src={logoIsafe} alt="iSafe Logo" className="h-8 w-auto mr-2" /> {/* Logo importado */}
            <span className="font-bold text-xl" style={{ fontFamily: "Montserrat, sans-serif" }}>
              iSafe {/* Nombre con fuente Montserrat */}
            </span>
          </NavigationMenuItem>

          {/* Sección para móviles (visible solo en pantallas pequeñas) */}
          <span className="flex md:hidden">
            <ModeToggle /> {/* Botón para cambiar tema */}

            {/* Menú lateral para móviles */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger className="px-2">
                <Menu className="flex md:hidden h-5 w-5" onClick={() => setIsOpen(true)}>
                  <span className="sr-only">Menu Icon</span> {/* Texto accesible */}
                </Menu>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle className="font-bold text-xl">Shadcn/React</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col justify-center items-center gap-2 mt-4">
                  {/* Enlaces del menú */}
                  {routeList.map(({ href, label }: RouteProps) => (
                    <a
                      rel="noreferrer noopener"
                      key={label}
                      href={href}
                      onClick={() => setIsOpen(false)} // Cierra el menú al hacer clic
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      {label}
                    </a>
                  ))}
                  {/* Botón de WhatsApp */}
                  <a
                    rel="noreferrer noopener"
                    href="https://bit.ly/iSafe-Whatsapp"
                    target="_blank"
                    className={`w-[110px] border text-[#25D366] ${buttonVariants({ variant: "secondary" })}`}
                  >
                    <FaWhatsapp className="mr-2 w-5 h-5 text-[#25D366]" /> {/* Icono verde */}
                    Whatsapp {/* Texto verde */}
                  </a>
                </nav>
              </SheetContent>
            </Sheet>
          </span>

          {/* Navegación para escritorio (visible solo en pantallas grandes) */}
          <nav className="hidden md:flex gap-2">
            {routeList.map((route: RouteProps, i) => (
              <a
                rel="noreferrer noopener"
                href={route.href}
                key={i}
                className={`text-[17px] ${buttonVariants({ variant: "ghost" })}`}
              >
                {route.label}
              </a>
            ))}
          </nav>

          {/* Botones de acción para escritorio */}
          <div className="hidden md:flex gap-2">
            {/* Botón de WhatsApp */}
            <a
              rel="noreferrer noopener"
              href="https://bit.ly/iSafe-Whatsapp"
              target="_blank"
              className={`border text-[#25D366] ${buttonVariants({ variant: "secondary" })}`}
            >
              <FaWhatsapp className="mr-2 w-5 h-5 text-[#25D366]" /> {/* Icono verde */}
              Whatsapp {/* Texto verde */}
            </a>
            <ModeToggle /> {/* Botón para cambiar tema */}
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};