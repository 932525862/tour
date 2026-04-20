import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { z } from "zod";
import { Loader2, CheckCircle2, Send } from "lucide-react";

import { submitRegistration } from "@/lib/registration.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  fullName: z.string().trim().min(2, "Ismni to'liq kiriting").max(100),
  phone: z
    .string()
    .trim()
    .min(7, "Telefon raqam noto'g'ri")
    .max(25)
    .regex(/^[+\d\s()-]+$/, "Telefon raqam noto'g'ri formatda"),
  exhibitionDate: z.enum(["25-26-april", "28-29-april"], {
    message: "Sanani tanlang",
  }),
  peopleCount: z.coerce.number().int().min(1, "Kamida 1 kishi").max(100),
  note: z.string().trim().max(500).optional(),
});

type FormErrors = Partial<Record<keyof z.infer<typeof formSchema>, string>>;

export function RegistrationForm() {
  const submitFn = useServerFn(submitRegistration);
  const [errors, setErrors] = useState<FormErrors>({});
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [exhibitionDate, setExhibitionDate] = useState<string>("");
  const [phone, setPhone] = useState<string>("+998 ");

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value.startsWith("+998")) {
      setPhone("+998 ");
      return;
    }
    setPhone(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const raw = {
      fullName: formData.get("fullName")?.toString() ?? "",
      phone: formData.get("phone")?.toString() ?? "",
      exhibitionDate: exhibitionDate,
      peopleCount: formData.get("peopleCount")?.toString() ?? "",
      note: formData.get("note")?.toString() ?? "",
    };

    const parsed = formSchema.safeParse(raw);
    if (!parsed.success) {
      const fieldErrors: FormErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof FormErrors;
        if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);
    try {
      await submitFn({ data: parsed.data });
      setSuccess(true);
      toast.success("Arizangiz qabul qilindi! Tez orada bog'lanamiz.");
      setTimeout(() => {
        window.location.href = "https://t.me/tourland_uz";
      }, 3000);
    } catch (err) {
      console.error(err);
      toast.error("Xatolik yuz berdi. Iltimos, qayta urinib ko'ring.");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="rounded-2xl bg-card p-10 text-center shadow-[var(--shadow-card)]">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <CheckCircle2 className="h-9 w-9 text-primary" />
        </div>
        <h3 className="text-2xl font-bold text-foreground">Ariza qabul qilindi!</h3>
        <p className="mt-2 text-muted-foreground">
          Menejerlarimiz tez orada siz bilan bog'lanishadi.
        </p>
        <p className="mt-4 text-sm text-primary font-medium">
          3 soniyadan so'ng Telegram guruhimizga yo'naltirilasiz...
        </p>
        <a
          href="https://t.me/tourland_uz"
          className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition"
        >
          Hoziroq guruhga o'tish
        </a>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-card p-6 shadow-[var(--shadow-card)] sm:p-8"
      noValidate
    >
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-foreground">Ro'yxatdan o'tish</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Ma'lumotlaringizni qoldiring — biz siz bilan bog'lanamiz.
        </p>
      </div>

      <div className="space-y-5">
        <div>
          <Label htmlFor="fullName">Ismingiz va familiyangiz</Label>
          <Input
            id="fullName"
            name="fullName"
            placeholder="Masalan, Akbar Karimov"
            maxLength={100}
            required
            className="mt-1.5"
          />
          {errors.fullName && <p className="mt-1 text-sm text-destructive">{errors.fullName}</p>}
        </div>

        <div>
          <Label htmlFor="phone">Telefon raqamingiz</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="+998 90 123 45 67"
            maxLength={25}
            required
            value={phone}
            onChange={handlePhoneChange}
            className="mt-1.5"
          />
          {errors.phone && <p className="mt-1 text-sm text-destructive">{errors.phone}</p>}
        </div>

        <div>
          <Label htmlFor="exhibitionDate">Qaysi sanadagi ko'rgazmaga qatnashmoqchisiz?</Label>
          <Select value={exhibitionDate} onValueChange={setExhibitionDate}>
            <SelectTrigger id="exhibitionDate" className="mt-1.5">
              <SelectValue placeholder="Sanani tanlang" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="25-26-april">25–26 Aprel ko'rgazmasi</SelectItem>
              <SelectItem value="28-29-april">28–29 Aprel ko'rgazmasi</SelectItem>
            </SelectContent>
          </Select>
          {errors.exhibitionDate && (
            <p className="mt-1 text-sm text-destructive">{errors.exhibitionDate}</p>
          )}
        </div>

        <div>
          <Label htmlFor="peopleCount">Necha kishi bo'lasizlar?</Label>
          <Input
            id="peopleCount"
            name="peopleCount"
            type="number"
            min={1}
            max={100}
            placeholder="Masalan, 2"
            required
            className="mt-1.5"
          />
          {errors.peopleCount && (
            <p className="mt-1 text-sm text-destructive">{errors.peopleCount}</p>
          )}
        </div>

        <div>
          <Label htmlFor="note">Qo'shimcha izoh (ixtiyoriy)</Label>
          <Textarea
            id="note"
            name="note"
            placeholder="Qaysi sohada qiziqishingiz bor?"
            maxLength={500}
            rows={3}
            className="mt-1.5"
          />
        </div>

        <Button type="submit" variant="hero" size="lg" className="w-full" disabled={submitting}>
          {submitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Yuborilmoqda...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Arizani yuborish
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
