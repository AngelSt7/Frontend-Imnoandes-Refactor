'use client'
import { useUser } from "@/src/contexts/UserContext";
import { Tabs, Tab, Card, CardBody } from "@heroui/react";
import { useState } from "react";
import PasswordForm from "./PasswordForm";
import EmailForm from "./EmailForm";
import { UpdatePhone } from "@/src/features/property/admin/Settings";
import { Phone, Mail, Lock, User } from "lucide-react";

export default function UserForm() {
  const user = useUser();
  const [selected, setSelected] = useState<React.Key>("Teléfono");

  return (
    <div className="flex flex-col w-full justify-center items-center ">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 font-sans">Configuración de Usuario</h1>
        <p className="text-gray-600">Actualiza tu información personal</p>
      </div>

      <Card className="max-w-full w-[500px] min-h-[380px] shadow-xl bg-white/80 backdrop-blur-sm border-0">
        <CardBody className="overflow-hidden p-4 md:p-6 lg:p-8">
          <Tabs
            fullWidth
            aria-label="Tabs form"
            selectedKey={selected as string}
            size="lg"
            onSelectionChange={setSelected}
          classNames={{
              base: "w-full",
              tabList: "gap-0 w-full relative rounded-xl bg-zinc-100 p-1 shadow-sm",
              cursor: "w-full bg-blue-600 shadow-md rounded-lg",
              tab: "flex-1 px-3 md:px-6 py-2 md:py-3 h-10 md:h-12 font-semibold transition-all duration-200",
              tabContent: "group-data-[selected=true]:text-white text-zinc-600 font-medium flex items-center justify-center gap-1 md:gap-2 text-xs md:text-sm",
              panel: "mt-4 md:mt-6 lg:mt-8"
            }}
          >
            <Tab 
              key="Teléfono" 
              title={
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>Teléfono</span>
                </div>
              }
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4 md:mb-6">
                  <div className="p-2 bg-zinc-100 rounded-lg">
                    <Phone className="w-4 h-4 md:w-5 md:h-5 text-zinc-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-zinc-800 text-sm md:text-base">Número de Teléfono</h3>
                    <p className="text-xs md:text-sm text-zinc-600">Actualiza tu número de contacto</p>
                  </div>
                </div>
                <UpdatePhone user={user} />
              </div>
            </Tab>

            {user.authProvider === 'LOCAL' && (
              <Tab 
                key="Email" 
                title={
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>Email</span>
                  </div>
                }
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-4 md:mb-6">
                    <div className="p-2 bg-zinc-100 rounded-lg">
                      <Mail className="w-4 h-4 md:w-5 md:h-5 text-zinc-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-zinc-800 text-sm md:text-base">Correo Electrónico</h3>
                      <p className="text-xs md:text-sm text-zinc-600">Cambia tu dirección de email</p>
                    </div>
                  </div>
                  <EmailForm user={user} />
                </div>
              </Tab>
            )}

            {user.authProvider === 'LOCAL' && (
              <Tab 
                key="Password" 
                title={
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    <span>Password</span>
                  </div>
                }
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-4 md:mb-6">
                    <div className="p-2 bg-zinc-100 rounded-lg">
                      <Lock className="w-4 h-4 md:w-5 md:h-5 text-zinc-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-zinc-800 text-sm md:text-base">Contraseña</h3>
                      <p className="text-xs md:text-sm text-zinc-600">Actualiza tu contraseña de acceso</p>
                    </div>
                  </div>
                  <PasswordForm user={user} />
                </div>
              </Tab>
            )}
          </Tabs>
        </CardBody>
      </Card>
      
      <div className="mt-6 md:mt-8 text-center px-4">
        <p className="text-xs md:text-sm text-zinc-500">
          Mantén tu información actualizada para una mejor experiencia
        </p>
      </div>
    </div>
  );
}