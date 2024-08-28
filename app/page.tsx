import { BorderBeam } from "@/components/magicui/border-beam";
import TypingAnimation from "@/components/magicui/typing-animation";
import { data, felicitacoes } from "@/data/data";
import { format, isBefore, addYears } from "date-fns";
import { ptBR } from "date-fns/locale";

interface User {
  id: number;
  name: string;
  birthday: string; // Formato DD/MM
  gender: string;
  address: string;
  phone: string;
  email: string;
  status: string;
  image: string;
}

// Função para calcular a próxima data de aniversário
const getNextBirthday = (birthday: string): Date => {
  const today = new Date();
  const [day, month] = birthday.split("/").map(Number);
  let nextBirthday = new Date(today.getFullYear(), month - 1, day);

  // Se o aniversário já passou neste ano, adiciona um ano
  if (isBefore(nextBirthday, today)) {
    nextBirthday = addYears(nextBirthday, 1);
  }

  return nextBirthday;
};

// Ordenar a lista de dados pelo próximo aniversário
const sortedData: User[] = data.sort((a, b) => {
  const nextBirthdayA = getNextBirthday(a.birthday).getTime();
  const nextBirthdayB = getNextBirthday(b.birthday).getTime();
  return nextBirthdayA - nextBirthdayB;
});

// Obter o próximo aniversariante
const nextBirthdayUser = sortedData[0];

// Filtrar a lista para remover o próximo aniversariante
const otherUsers = sortedData.filter((user) => user.id !== nextBirthdayUser.id);

const funnyMessages = [
  "Faltam poucos dias para o show!",
  "Preparando o bolo, aguarde...",
  "A contagem regressiva já começou!",
  "Em breve será hora da festa!",
  "Segure o confete, o aniversário está chegando!",
  "Prepare a pista de dança, a festa vem aí!",
  "Contagem regressiva: quase lá!",
  "Prepare-se para a celebração!",
  "Está quase na hora de cantar parabéns!",
  "Aniversário à vista! Já pode se preparar para a festa!",
];

// Função para obter uma mensagem engraçada aleatória
const getRandomFunnyMessage = (): string => {
  return funnyMessages[Math.floor(Math.random() * funnyMessages.length)];
};

const Home = () => {
  // Seleciona o próximo usuário que vai fazer aniversário
  const user = nextBirthdayUser;
  const congratulations =
    felicitacoes[Math.floor(Math.random() * felicitacoes.length)];

  return (
    <div className="wrapper grid gap-2">
      <TypingAnimation
        className="text-xs font-bold text-black dark:text-white uppercase text-start"
        text="Jovens Shekinah"
      />
      <div className="relative flex p-4 w-full overflow-hidden rounded-lg border bg-background md:shadow-xl">
        <div className="grid grid-cols-10 gap-2">
          <div className="col-span-2">
            <div className="w-12 h-12">
              <img
                src={user?.image}
                alt={user?.name}
                className="w-full h-full rounded-full"
              />
            </div>
          </div>
          <div className="grid col-span-8">
            <h1 className="font-bold">{user?.name}</h1>
            <p className="text-sm text-muted-foreground">
              {format(getNextBirthday(user?.birthday), "dd MMMM", {
                locale: ptBR,
              })}
            </p>
            <p className="text-sm text-muted-foreground">{congratulations}</p>
          </div>
        </div>
        <BorderBeam size={250} duration={12} delay={9} />
      </div>

      <ol className="relative border-s border-gray-200 dark:border-gray-700">
        {otherUsers.map((person, index) => (
          <li key={index} className="ms-4">
            <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
            <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              {format(getNextBirthday(person.birthday), "dd MMMM", {
                locale: ptBR,
              })}
            </time>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {person.name}
            </h3>
            <p className="text-base font-normal text-gray-500 dark:text-gray-400">
              {getRandomFunnyMessage()}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Home;
