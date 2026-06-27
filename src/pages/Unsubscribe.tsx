import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { backend, backendAnonKey, backendUrl } from "@/lib/backendClient";

type State = "loading" | "valid" | "invalid" | "already" | "success" | "error";

const Unsubscribe = () => {
  const [params] = useSearchParams();
  const token = params.get("token");
  const [state, setState] = useState<State>("loading");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!token) {
      setState("invalid");
      return;
    }
    (async () => {
      try {
        const res = await fetch(
          `${backendUrl}/functions/v1/handle-email-unsubscribe?token=${encodeURIComponent(token)}`,
          { headers: { apikey: backendAnonKey } }
        );
        const data = await res.json();
        if (data.valid) setState("valid");
        else if (data.reason === "already_unsubscribed") setState("already");
        else setState("invalid");
      } catch {
        setState("error");
      }
    })();
  }, [token]);

  const confirm = async () => {
    if (!token) return;
    setSubmitting(true);
    const { data, error } = await backend.functions.invoke("handle-email-unsubscribe", {
      body: { token },
    });
    setSubmitting(false);
    if (error) setState("error");
    else if (data?.success) setState("success");
    else if (data?.reason === "already_unsubscribed") setState("already");
    else setState("error");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full bg-card border border-border rounded-lg p-8 text-center shadow-sm">
        <h1 className="text-2xl font-serif text-primary mb-4">Cancelar suscripción</h1>
        {state === "loading" && <p className="text-muted-foreground">Verificando...</p>}
        {state === "valid" && (
          <>
            <p className="text-muted-foreground mb-6">
              ¿Confirmas que deseas dejar de recibir correos?
            </p>
            <Button onClick={confirm} disabled={submitting} className="w-full">
              {submitting ? "Procesando..." : "Confirmar baja"}
            </Button>
          </>
        )}
        {state === "success" && (
          <p className="text-foreground">Tu correo fue dado de baja correctamente.</p>
        )}
        {state === "already" && (
          <p className="text-muted-foreground">Este correo ya fue dado de baja anteriormente.</p>
        )}
        {state === "invalid" && (
          <p className="text-muted-foreground">El enlace no es válido o ha expirado.</p>
        )}
        {state === "error" && (
          <p className="text-destructive">Ocurrió un error. Intenta nuevamente más tarde.</p>
        )}
      </div>
    </main>
  );
};

export default Unsubscribe;
