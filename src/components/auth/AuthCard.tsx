import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import PawCrewLogo from "../PawCrewLogo";

type CardWrappersProps = {
  children: React.ReactNode;
  cardTitle: string;
};

const AuthCard = ({ cardTitle, children }: CardWrappersProps) => {
  return (
    <Card>
      <CardHeader className="space-y-2">
        <CardTitle className="flex flex-col items-center justify-center gap-2">
          <PawCrewLogo color="black" />
        </CardTitle>
        <CardDescription className="text-center text-2xl font-medium">{cardTitle}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default AuthCard;
