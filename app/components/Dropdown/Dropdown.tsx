"use client";
import React, {
  Dispatch,
  SetStateAction,
  use,
  useEffect,
  useState,
} from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Input,
} from "@nextui-org/react";
import { SearchIcon } from "../SearchIcon";
import { Coin } from "../../types/coin";
import { CoinSearchResponse } from "../../types/coingecko/searchCoinResponse";
import { GetCoinResponse } from "@/app/types/coingecko/getCoinResponse";
import { Image } from "@nextui-org/react";
import styles from "./styles.module.css";
import { IConversionCoin } from "../Conversion/Conversion";

interface INextUiDropdownProps {
  trendingCoins: Coin[];
  setSelectedCoin: Dispatch<SetStateAction<GetCoinResponse | undefined>>;
  initialValue: string;
  coin: GetCoinResponse | undefined;
}

export default function NextUiDropdown(props: INextUiDropdownProps) {
  const [selectedKeys, setSelectedKeys] = useState(
    new Set([props.initialValue])
  );
  const [currentQuery, setCurrentQuery] = useState("");
  const [dropdownSelectedCoin, setDropdownSelectedCoin] =
    useState<GetCoinResponse>();

  const [searchResult, setSearchResult] = useState(new Array<Coin>());

  useEffect(() => {
    setDropdownSelectedCoin(props.coin);
  }, [props.coin]);

  useEffect(() => {
    const selected = selectedKeys.keys().next().value;

    const getCoinData = async () => {
      const result = await fetch(`api/coin/${selected}`);

      if (result.ok) {
        const data = (await result.json()).queryResponse as GetCoinResponse;
        setDropdownSelectedCoin(data);
        setCurrentQuery("");
        props.setSelectedCoin(data);
      }
    };

    getCoinData();
  }, [selectedKeys]);

  useEffect(() => {
    setSearchResult(props.trendingCoins);
  }, []);

  useEffect(() => {
    const queryApi = async () => {
      const result = await fetch(`api/convert/search?query=${currentQuery}`);

      if (result.ok) {
        const data = (await result.json()) as CoinSearchResponse;
        setSearchResult(data.queryResponse.coins.slice(0, 5));
      }
    };

    queryApi();
  }, [currentQuery]);

  const handleKeyDown = async (event: any) => {
    //if not letter
    if (event.code === "Backspace") {
      setCurrentQuery((old) => old.slice(0, old.length - 1));
      return;
    }

    if (event.code !== `Key${event.key.toUpperCase()}`) {
      return;
    }

    setCurrentQuery((old) => old + event.key);
  };
  const createDropdownItems = (): any => {
    const arr: React.JSX.Element[] = [];

    if (searchResult.length > 0) {
      searchResult.map((coin) => {
        arr.push(
          <DropdownItem key={coin.id} textValue={"test"}>
            <div className={styles.coinContainer}>
              {coin.thumb && (
                <Image src={coin.thumb} alt={""} width={20} height={20}></Image>
              )}
              <p>{coin.name}</p>
              <p>{coin.symbol}</p>
            </div>
          </DropdownItem>
        );
      });
    } else {
      props.trendingCoins.map((coin) => {
        arr.push(
          <DropdownItem key={coin.id} textValue={"test"}>
            <div className={styles.coinContainer}>
              {coin.thumb && (
                <Image
                  src={coin.thumb}
                  alt={"coin logo"}
                  width={20}
                  height={20}
                ></Image>
              )}
              <p>{coin.name}</p>
              <p>{coin.symbol}</p>
            </div>
          </DropdownItem>
        );
      });
    }

    return arr;
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="light" size="lg" className="capitalize px-3">
          <div className={styles.dropDownTrigger__button__content}>
            <Image src={dropdownSelectedCoin?.image?.thumb}></Image>
            <p>{dropdownSelectedCoin?.symbol}</p>
          </div>
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Single selection dropdown"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selectedKeys}
        // @ts-ignore: Unreachable code error
        onSelectionChange={setSelectedKeys}
      >
        <DropdownItem key="search" textValue="test" isReadOnly>
          <Input
            classNames={{
              base: "max-w-full sm:max-w-[10rem] h-10",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper:
                "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type to search..."
            size="sm"
            startContent={<SearchIcon size={18} width={20} height={20} />}
            type="search"
          />
        </DropdownItem>
        {createDropdownItems()}
      </DropdownMenu>
    </Dropdown>
  );
}
