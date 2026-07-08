import { useEffect, useState } from "react";
import { backend } from "@/lib/backendClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Trash2, Plus } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type Payment = Database["public"]["Tables"]["payments"]["Row"];

interface Props {
  userId: string;
}

const emptyForm = {
  client_name: "",
  concept: "",
  amount: "",
  currency: "CLP",
  period_start: "",
  period_end: "",
  paid_at: new Date().toISOString().slice(0, 10),
  notes: "",
};

const formatMoney = (amount: number, currency: string) => {
  try {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency,
      maximumFractionDigits: currency === "CLP" ? 0 : 2,
    }).format(amount);
  } catch {
    return `${currency} ${amount.toLocaleString("es-CL")}`;
  }
};

const formatDate = (d: string) =>
  new Date(d + "T00:00:00").toLocaleDateString("es-CL", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const PaymentsManager = ({ userId }: Props) => {
  const { toast } = useToast();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Payment | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);

  const fetchPayments = async () => {
    const { data, error } = await backend
      .from("payments")
      .select("*")
      .order("paid_at", { ascending: false });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }
    setPayments(data || []);
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const resetForm = () => {
    setForm(emptyForm);
    setEditing(null);
    setShowForm(false);
  };

  const startEdit = (p: Payment) => {
    setEditing(p);
    setForm({
      client_name: p.client_name,
      concept: p.concept || "",
      amount: String(p.amount),
      currency: p.currency,
      period_start: p.period_start,
      period_end: p.period_end,
      paid_at: p.paid_at,
      notes: p.notes || "",
    });
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      user_id: userId,
      client_name: form.client_name,
      concept: form.concept || null,
      amount: parseFloat(form.amount),
      currency: form.currency,
      period_start: form.period_start,
      period_end: form.period_end,
      paid_at: form.paid_at,
      notes: form.notes || null,
    };
    const { error } = editing
      ? await backend.from("payments").update(payload).eq("id", editing.id)
      : await backend.from("payments").insert(payload);
    setLoading(false);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: editing ? "Pago actualizado" : "Pago registrado" });
    resetForm();
    fetchPayments();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Eliminar este pago?")) return;
    const { error } = await backend.from("payments").delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }
    fetchPayments();
  };

  const total = payments.reduce((sum, p) => sum + Number(p.amount), 0);

  return (
    <section className="mt-12">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-foreground">Historial de pagos</h2>
          <p className="text-sm text-muted-foreground">
            {payments.length} pago{payments.length === 1 ? "" : "s"} · Total{" "}
            {formatMoney(total, payments[0]?.currency || "CLP")}
          </p>
        </div>
        {!showForm && (
          <Button size="sm" onClick={() => setShowForm(true)}>
            <Plus size={16} className="mr-1" /> Nuevo pago
          </Button>
        )}
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-card p-6 rounded-lg border border-border mb-6 space-y-4"
        >
          <h3 className="font-semibold text-foreground">
            {editing ? "Editar pago" : "Registrar pago"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Cliente</Label>
              <Input
                value={form.client_name}
                onChange={(e) => setForm({ ...form, client_name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Concepto</Label>
              <Input
                value={form.concept}
                onChange={(e) => setForm({ ...form, concept: e.target.value })}
                placeholder="Ej: Comisión venta parcela"
              />
            </div>
            <div className="space-y-2">
              <Label>Monto</Label>
              <Input
                type="number"
                step="0.01"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Moneda</Label>
              <Input
                value={form.currency}
                onChange={(e) => setForm({ ...form, currency: e.target.value.toUpperCase() })}
                maxLength={3}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Inicio periodo facturación</Label>
              <Input
                type="date"
                value={form.period_start}
                onChange={(e) => setForm({ ...form, period_start: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Fin periodo facturación</Label>
              <Input
                type="date"
                value={form.period_end}
                onChange={(e) => setForm({ ...form, period_end: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Fecha de pago</Label>
              <Input
                type="date"
                value={form.paid_at}
                onChange={(e) => setForm({ ...form, paid_at: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Notas</Label>
            <Textarea
              rows={2}
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
            />
          </div>
          <div className="flex gap-2">
            <Button type="submit" disabled={loading}>
              {loading ? "Guardando..." : editing ? "Actualizar" : "Registrar"}
            </Button>
            <Button type="button" variant="outline" onClick={resetForm}>
              Cancelar
            </Button>
          </div>
        </form>
      )}

      {payments.length === 0 ? (
        <p className="text-muted-foreground text-center py-12 border border-dashed border-border rounded-lg">
          Aún no has registrado pagos.
        </p>
      ) : (
        <div className="overflow-x-auto border border-border rounded-lg">
          <table className="w-full text-sm">
            <thead className="bg-muted text-muted-foreground">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Cliente</th>
                <th className="text-left px-4 py-3 font-medium">Concepto</th>
                <th className="text-right px-4 py-3 font-medium">Monto</th>
                <th className="text-left px-4 py-3 font-medium">Periodo facturación</th>
                <th className="text-left px-4 py-3 font-medium">Pagado</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.id} className="border-t border-border">
                  <td className="px-4 py-3 font-medium text-foreground">{p.client_name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{p.concept || "—"}</td>
                  <td className="px-4 py-3 text-right font-semibold text-foreground whitespace-nowrap">
                    {formatMoney(Number(p.amount), p.currency)}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                    {formatDate(p.period_start)} → {formatDate(p.period_end)}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                    {formatDate(p.paid_at)}
                  </td>
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    <Button variant="ghost" size="icon" onClick={() => startEdit(p)}>
                      <Pencil size={16} />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(p.id)}>
                      <Trash2 size={16} className="text-destructive" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default PaymentsManager;
