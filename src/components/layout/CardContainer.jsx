import Card from "../ui/Card";

export default function CardsContainer() {
  return (
    <div className="px-6 py-10">
      {/* Responsive Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card
          title="Facials Services 💆‍♀️"
          items={[
            "Gold Facial 🫧",
            "Fruit Facial 🍊",
            "Diamond Facial 💎",
            "Luxury O3 Facial 👰‍♀️",
            "Lotus Facial 🪷"
          ]}
        />
        <Card
          title="Hair Services ✂️💇‍♀️"
          items={[
            "Step Cut ✌️",
            "Layer Cut 😍",
            "U Cut 💫",
            "Hair Spa & Hair Straightening 🎊",
          ]}
        />
        <Card
          title="Other Services ✨"
          items={[
            "Threading 🧵",
            "Body Wax 😊",
            "Manicure & Pedicure 💅",
            "Bleach 🌈",
          ]}
        />
      </div>
    </div>
  );
}
