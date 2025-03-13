import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import { fetcher } from "@/api";
  import { useState } from "react";
  import useSWR, { mutate } from "swr";


  
  interface Employee {
    id: number;
    name: string;
    email: string;
    phone: string;
    role: string;
    hire_date: string;
  }
  
  function EmployeesTableView() {
    const { data: employees, error, isLoading, mutate } = useSWR<Employee[]>("/employee", fetcher);
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      phone: "",
      role: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    if (isLoading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      console.log("❌ Error al obtener employees:", error);
      return <div>❌ Error cargando employees</div>;
    }
  
    if (!employees || employees.length === 0) {
      console.log("⚠️ No hay employees en la base de datos.");
      return <div>No hay employees</div>;
    }
  
    console.log("✅ Productos recibidos:", employees);
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      setSubmitError(null);
      console.log("form DATAAA", formData)
      try {
        const response = await fetch("http://localhost:3000/employee", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        console.log("RESPUESTA", response)
        if (!response.ok) {
          console.log(response)
          throw new Error("Error al registrar employee");
        }
  
        const newEmployee = await response.json();
      
        mutate((prevEmployee) => [...(prevEmployee || []), newEmployee], false);
        // 2. Revalidación de datos desde el servidor
        // mutate("/clients");
  
        setFormData({ name: "", email: "", phone: "", role: "" });
      } catch (err) {
        setSubmitError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setIsSubmitting(false);
      }
    };
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };


    return (
      <div className="space-y-6">
      {/* Formulario de Registro */}
      <div className="border p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold mb-4">Registrar Nuevo Empleado</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Nombre</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium">Teléfono</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium">Rol</label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div className="col-span-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
            >
              {isSubmitting ? "Registrando..." : "Registrar Cliente"}
            </button>
            {submitError && <p className="text-red-500 mt-2">{submitError}</p>}
          </div>
        </form>
      </div>






      <Table>
        <TableCaption>Lista de Productos</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead className="text-right">Address</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee: Employee) => (
            <TableRow key={employee.id}>
              <TableCell>{employee.id}</TableCell>
              <TableCell>{employee.name}</TableCell>
              <TableCell>{employee.email}</TableCell>
              <TableCell>${employee.phone}</TableCell>
              <TableCell className="text-right">{employee.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>
    );
  }
  
  export default EmployeesTableView;
  