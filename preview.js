const preview = document.querySelector("#previa");
const controls = preview.querySelector("fieldset");
const numberFormat = new Intl.NumberFormat("pt-BR");
const percentFormat = new Intl.NumberFormat("pt-BR", {
  style: "percent",
  maximumFractionDigits: 1,
});

const periods = {
  30: { leads: 420, preCadastro: 175, reservas: 52 },
  90: { leads: 1280, preCadastro: 548, reservas: 176 },
  180: { leads: 2540, preCadastro: 1070, reservas: 317 },
};

controls.addEventListener("change", (event) => {
  const period = periods[event.target.value];
  if (!period) return;

  preview.querySelector("#demo-leads").textContent = numberFormat.format(period.leads);
  preview.querySelector("#demo-reservas").textContent = numberFormat.format(period.reservas);
  preview.querySelector("#demo-conversao").textContent = percentFormat.format(period.reservas / period.leads);

  for (const row of preview.querySelectorAll("[data-stage]")) {
    const value = period[row.dataset.stage];
    row.querySelector("strong").textContent = numberFormat.format(value);
    row.querySelector(".funnel-track span").style.width = `${(value / period.leads) * 100}%`;
  }
});

controls.hidden = false;
