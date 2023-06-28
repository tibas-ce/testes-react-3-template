import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import UserCard from "../components/UserCard";

jest.mock("axios");

const axiosResponseMock = {
  data: {
    id: 7,
    firstName: "Oleta",
    lastName: "Abbott",
    bank: {
      cardExpire: "10/23",
      cardNumber: "3589640949470047"
    }
  }
};

describe("UserCard", () => {
  beforeEach(() => {
    axios.mockReset();
  });

  test("Fixação 1 - Deve iniciar com 'Loading...' e removê-lo após o carregamento", async () => {
    axios.get.mockResolvedValueOnce(axiosResponseMock);

    render(<UserCard />);
    
    const loading = screen.getByText(/loading\.\.\./i);

    expect(loading).toBeInTheDocument();

    await waitFor(() => {});
  })
  
  test("3 - Deve renderizar o título, imagem, decrição e o preço do produto após a atualização do component", async () => {
    axios.get.mockResolvedValueOnce(axiosResponseMock);

    render(<UserCard />);
    
    await waitFor(() => {
      const firstName = screen.getByRole(/oleta/i);
      const lastName = screen.getByRole(/abbott/i);
      const cardExpire = screen.getByText("bank", {cardExpire: "10/23"});
      const cardNumber = screen.getByText("bank", {cardNumber: /3589640949470047/i});

      expect(firstName).toBeInTheDocument();
      expect(lastName).toBeInTheDocument();
      expect(cardExpire).toBeInTheDocument();
      expect(cardNumber).toBeInTheDocument();
    });

    expect(screen.queryByText(/loading\.\.\./i));
  });
});

