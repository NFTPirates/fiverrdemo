"use client";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
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
import { Coiny } from "next/font/google/index";
import Image from "next/image";
import styles from "./styles.module.css";

interface INextUiDropdownProps {
  trendingCoins: Coin[];
  setSelectedCoin: Dispatch<SetStateAction<string | undefined>>;
}

export default function NextUiDropdown(props: INextUiDropdownProps) {
  const [selectedKeys, setSelectedKeys] = useState(new Set(["texxt"]));
  const [currentQuery, setCurrentQuery] = useState("");
  const [searchResult, setSearchResult] = useState(new Array<Coin>());
  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  useEffect(() => {
    const selected = selectedKeys.keys().next().value;
    console.log(selected, "selected");
    props.setSelectedCoin(selected);
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

  const createDropdownItems = (): Array<JSX.Element> => {
    const arr: React.JSX.Element[] = [];

    if (searchResult.length > 0) {
      searchResult.map((coin) => {
        arr.push(
          <DropdownItem key={coin.symbol}>
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
    } else {
      props.trendingCoins.map((coin) => {
        arr.push(
          <DropdownItem key={coin.symbol}>
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
        <Button variant="light" size="lg" className="capitalize">
          {selectedValue}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Single selection dropdown"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selectedKeys}
        // @ts-ignore
        onSelectionChange={setSelectedKeys}
      >
        <DropdownItem key="search" textValue="" isReadOnly>
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
